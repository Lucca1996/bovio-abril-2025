import { cn } from '@/lib/utils';


interface IconButtonProps {
    onClick: () => void,
    icon: React.ReactElement,
    className?: string,
}
export const IconButton = (props: IconButtonProps) => {
    const { icon, className, onClick } = props;
    return (
        <button 
            onClick={onClick} 
            className={cn(
                "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
                className
            )}
        >
            {icon}
        </button>
    )
}
