function HocLoader(isLoading: boolean, Loader: JSX.Element, content: JSX.Element) {
    if (isLoading) {
        return Loader;
    } return content;
}

export default HocLoader;