type ActivityPaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (next: number) => void;
};

export const ActivityPaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: ActivityPaginationControlsProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-lg border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Precedent
      </button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} / {totalPages}
      </span>
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-lg border border-border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};
