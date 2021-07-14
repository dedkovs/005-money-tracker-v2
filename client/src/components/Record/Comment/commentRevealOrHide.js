// import { setShowComments } from '../../../redux/slices/showComments';

const commentRevealOrHide = (
    id,
    showComments,
    // dispatch,
    wrapperRef,
    show,
    setShow
) => {
    if (!showComments) {
        // dispatch(setCollapsedComments(true));
        setShow(false);

        // let localStorage_transactions = localStorage.getItem('transactions');
        // if (localStorage_transactions && localStorage_transactions.length > 0) {
        //     let jsonTransactions = JSON.parse(localStorage_transactions);
        //     jsonTransactions[id - 1].show = false;
        //     localStorage.transactions = JSON.stringify(jsonTransactions);
        // }

        if (
            wrapperRef.current.nextSibling &&
            wrapperRef.current.nextSibling.style.maxHeight
        ) {
            wrapperRef.current.nextSibling.style.maxHeight = null;
        }
    }

    if (showComments) {
        // dispatch(setCollapsedComments(false));
        setShow(true);

        // let localStorage_transactions = localStorage.getItem('transactions');
        // if (localStorage_transactions && localStorage_transactions.length > 0) {
        //     let jsonTransactions = JSON.parse(localStorage_transactions);
        //     jsonTransactions[id - 1].show = true;
        //     localStorage.transactions = JSON.stringify(jsonTransactions);
        // }

        if (wrapperRef.current.nextSibling) {
            wrapperRef.current.nextSibling.style.maxHeight =
                wrapperRef.current.nextSibling.scrollHeight + 20 + 'px';
        }
    }
};

export default commentRevealOrHide;
