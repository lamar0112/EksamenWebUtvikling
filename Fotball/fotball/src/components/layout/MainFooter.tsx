const MainFooter = () => {
    return (
        <footer className="mt-8 border-t bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-gray-600">
                SportsWorld © {new Date().getFullYear()} – DS3103 Webutvikling
            </div>
        </footer>
    );
};

export default MainFooter;
