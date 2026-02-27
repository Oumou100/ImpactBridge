import SpinnerIcon from "@assets/icons/spinner.svg";

type SpinnerProps = {
    className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ className }) => {
    return (
        <div
            className={`flex items-center justify-center m-auto w-24 h-24 text-[75px] ${className}`}
        >
            <SpinnerIcon />
        </div>
    );
};