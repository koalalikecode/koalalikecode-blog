import Link from "next/link";
import Layout from "../components/layout";
import EmptyState from "../components/ui/EmptyState";

export default function Custom404() {
  return (
    <Layout>
      <section className="py-16">
        <EmptyState
          title="Page not found"
          description="The page you are looking for does not exist or has been moved."
          actionLabel="Go to homepage"
          actionHref="/"
        />
        <div className="mt-4 text-center text-sm text-slate-500">
          or{" "}
          <Link href="/search" className="text-blue-550 hover:underline">
            search for an article
          </Link>
        </div>
      </section>
    </Layout>
  );
}
