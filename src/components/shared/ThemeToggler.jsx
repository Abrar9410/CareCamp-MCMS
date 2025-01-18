import { useEffect, useState } from "react";


const ThemeToggler = () => {

    const [theme, setTheme] = useState(null);

    // Set theme based on system preference or localStorage on initial load
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.add(storedTheme);
        } else if (prefersDark) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }, []);

    // Update theme dynamically when user toggles
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme); 
        localStorage.setItem('theme', newTheme);
    };

    if (theme===null) return null;

    return (
        <div>
            <label className="flex items-center cursor-pointer min-[400px]:gap-1 lg:gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 min-[350px]:w-4 min-[350px]:h-4 lg:w-5 lg:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <path
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <input type="checkbox" onChange={toggleTheme} className="toggle w-6 h-3 min-[300px]:w-8 min-[300px]:h-4 min-[350px]:w-10 min-[350px]:h-5 sm:w-12 sm:h-6" checked={theme==='dark'}/>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 min-[350px]:w-4 min-[350px]:h-4 sm:w-5 sm:h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            </label>
        </div>
    );
};

export default ThemeToggler;