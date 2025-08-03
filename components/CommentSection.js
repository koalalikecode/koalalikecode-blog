import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const editorRef = useRef(null);
  const [replyToName, setReplyToName] = useState("");

  useEffect(() => {
    fetchComments();
  }, [postId]);

  async function fetchComments() {
    try {
      const res = await fetch(`/api/comments/${postId}`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError("Unable to load comments");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const displayName = name.trim() ? name : 'Anonymous';
    if (!content.trim()) {
      setError("Please enter your comment");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          parentId: replyTo,
          name: displayName,
          content
        })
      });
      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "An error occurred");
      } else {
        setName("");
        setContent("");
        setReplyTo(null);
        fetchComments();
      }
    } catch (err) {
      setError("An error occurred while submitting your comment");
    }
    setLoading(false);
  }

  function handleReply(parentId, parentName) {
    setReplyTo(parentId);
    setReplyToName(parentName);
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus vào editor nếu có thể
        const quill = editorRef.current.querySelector('.ql-editor');
        if (quill) quill.focus();
      }
    }, 100);
  }

  function handleCancelReply() {
    setReplyTo(null);
    setReplyToName("");
  }

  const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'code'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['blockquote', 'code-block'],
    ['link'],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ];

  return (
    <section className="mt-12 border-t pt-8" id="comments">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-4 rounded shadow-sm" ref={editorRef}>
        {replyTo && (
          <div className="mb-2 text-sm text-blue-600 flex items-center gap-2">
            Reply to <span className="font-semibold">{replyToName}</span>
            <button type="button" onClick={handleCancelReply} className="ml-2 text-xs text-red-500 underline">Cancel</button>
          </div>
        )}
        <input
          className="block w-full mb-2 p-2 border rounded"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          maxLength={40}
        />
        <div className="mb-2">
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            placeholder="Write your comment..."
            modules={{ toolbar: toolbarOptions }}
            style={{ background: 'white' }}
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Submitting...' : (replyTo ? 'Reply' : 'Comment')}
        </button>
      </form>
      <div>
        {comments.length === 0 && <div className="text-gray-500">No comments yet.</div>}
        <ul>
          {comments.map(parent => (
            <li key={parent._id} className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">{parent.name}</span>
                <span className="text-xs text-gray-400">{new Date(parent.createdAt).toLocaleString()}</span>
              </div>
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: parent.content }} />
              <button
                className="text-blue-600 text-xs mt-1 hover:underline"
                onClick={() => handleReply(parent._id, parent.name)}
                disabled={!!replyTo}
              >
                Reply
              </button>
              {/* Show replies */}
              {parent.replies && parent.replies.length > 0 && (
                <ul className="ml-6 mt-2 border-l pl-4 border-gray-200">
                  {parent.replies.map(child => (
                    <li key={child._id} className="mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{child.name}</span>
                        <span className="text-xs text-gray-400">{new Date(child.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: child.content }} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}