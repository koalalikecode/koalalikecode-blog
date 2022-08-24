import { AiOutlineSearch } from 'react-icons/ai';

export default function SideBar({tags}) {
    return(
        <div className="sticky top-20 lg:static">
              <form className="flex items-center mb-6" action="">
                <input type="text" className="p-2 bg-blue-50" placeholder="Search..." name="search" />
                <button className="px-4 py-3 bg-blue-550" type="submit"><AiOutlineSearch className="fill-white"/></button>
              </form>
              <h2 className="text-xl font-mon font-semibold opacity-80 mb-5">Chủ đề</h2>
              <div className="flex flex-wrap mb-8">
                {tags.map(tag => <a key={tag} href="#" className="rounded-2xl px-3 py-1 mr-2 mb-2 bg-blue-50 text-blue-550 hover:opacity-70 ease-in duration-300">{tag}</a>)}
              </div>
            </div>
    )
}