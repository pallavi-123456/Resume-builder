import clsx from "clsx";

const Skeleton = ({ className }) => {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-xl bg-ink-800/8 dark:bg-white/8",
        className
      )}
    />
  );
};

export default Skeleton;
