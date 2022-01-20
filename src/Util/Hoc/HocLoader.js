function HocLoader(isLoading, Loader, content) {
    if (!isLoading) {
        return Loader;
    } return content;
}

export default HocLoader;