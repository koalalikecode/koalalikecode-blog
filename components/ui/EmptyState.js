import Link from "next/link";
import Card from "./Card";

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref = "/",
}) {
  return (
    <Card className="p-6 text-center">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{description}</p>
      {actionLabel && (
        <Link
          href={actionHref}
          className="ui-btn-outline mt-4 inline-flex"
          aria-label={actionLabel}
        >
          {actionLabel}
        </Link>
      )}
    </Card>
  );
}
