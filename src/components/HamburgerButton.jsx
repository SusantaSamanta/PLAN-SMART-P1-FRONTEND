const HamburgerButton = ({ isOpen, onToggle }) => {
    return (
        <div
            onClick={onToggle}
            className="lg:hidden relative w-6 h-4 md:w-8 md:h-6 mt-[6px] md:mt-1 mr-4 md:mr-6  flex flex-col justify-between focus:outline-none"
        >
            <span
                className={`h-[2px] md:h-1 w-full bg-white rounded transition-all duration-300
        ${isOpen ? "rotate-45 translate-y-[6px] md:translate-y-3" : ""}`}
            />
            <span
                className={`h-[2px] md:h-1 w-full bg-white rounded transition-all duration-300
        ${isOpen ? "opacity-0" : ""}`}
            />
            <span
                className={`h-[2px] md:h-1 w-full bg-white rounded transition-all duration-300
        ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
        </div>
    );
};

export default HamburgerButton;
