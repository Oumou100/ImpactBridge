import Image from "next/image";

type SpinnerProps = {
    className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ className }) => {
    return (
        <div
            className={`flex items-center justify-center m-auto w-24 h-24 text-[75px] ${className}`}
        >
            <Image src="/assets/icons/spinner.svg" alt="Loading" width={12} height={12} />
        </div>
    );
};
