// import { setAllTransactions } from '../../../redux/slices/transactions';

const revealRecordCommentFunc = (
    id,
    x,
    y,
    wrapperRef,
    recordMenuButtonRef,
    show,
    setShow,
    dispatch,
    record,
    e
) => {
    // console.log(record);
    let isRightMB;
    e = e || window.event;

    if ('which' in e)
        // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        isRightMB = e.which === 3;
    else if ('button' in e)
        // IE, Opera
        isRightMB = e.button === 2;

    if (
        e.clientX > x - 5 &&
        e.clientX < x + 5 &&
        e.clientY > y - 5 &&
        e.clientY < y + 5 &&
        !isRightMB
    ) {
        if (
            wrapperRef.current.contains(e.target) &&
            !recordMenuButtonRef.current.contains(e.target)
        ) {
            setShow(!show);
            // let jsonTransactions = JSON.parse(localStorage.transactions);
            // let index = jsonTransactions.findIndex((trx) => trx.id === id);
            // console.log(index);
            // jsonTransactions[index].show = !show;
            // localStorage.transactions = JSON.stringify(jsonTransactions);

            // let localStorage_transactions =
            //     localStorage.getItem('transactions');
            // if (
            //     localStorage_transactions &&
            //     localStorage_transactions.length > 0
            // ) {
            //     let jsonTransactions = JSON.parse(localStorage_transactions);
            //     jsonTransactions[id - 1].show = !show;
            //     localStorage.transactions = JSON.stringify(jsonTransactions);
            //     dispatch(setAllTransactions(jsonTransactions));
            // }

            if (wrapperRef.current.nextSibling.style.maxHeight) {
                wrapperRef.current.nextSibling.style.maxHeight = null;
            } else {
                wrapperRef.current.nextSibling.style.maxHeight =
                    wrapperRef.current.nextSibling.scrollHeight + 20 + 'px';
            }
        }
    } else return;
};

export default revealRecordCommentFunc;
