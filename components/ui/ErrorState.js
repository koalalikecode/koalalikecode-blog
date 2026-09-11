import Link from "next/link";
import Card from "./Card";

export default function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
  actionLabel = "Go back home",
  actionHref = "/",
}) {
  return (
    <Card className="border-red-200 p-6 text-center dark:border-red-900">
      <h3 className="text-xl font-bold text-red-600 dark:text-red-300">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
      <Link href={actionHref} className="ui-btn-outline mt-4 inline-flex">
        {actionLabel}
      </Link>
    </Card>
  );
}
