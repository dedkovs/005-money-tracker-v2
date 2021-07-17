const commentRevealOrHide = (showComments, wrapperRef, setShow) => {
    if (showComments === false) {
        setShow(false);

        if (
            wrapperRef.current.nextSibling &&
            wrapperRef.current.nextSibling.style.maxHeight
        ) {
            wrapperRef.current.nextSibling.style.maxHeight = null;
        }
    }

    if (showComments === true) {
        setShow(true);

        if (wrapperRef.current.nextSibling) {
            wrapperRef.current.nextSibling.style.maxHeight =
                wrapperRef.current.nextSibling.scrollHeight + 20 + 'px';
        }
    }
};

export default commentRevealOrHide;
