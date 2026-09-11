import Layout from "../components/layout";
import ErrorState from "../components/ui/ErrorState";

export default function Custom500() {
  return (
    <Layout>
      <section className="py-16">
        <ErrorState
          title="Server error"
          description="Something went wrong on our side. Please try again in a moment."
          actionLabel="Back to homepage"
          actionHref="/"
        />
      </section>
    </Layout>
  );
}
