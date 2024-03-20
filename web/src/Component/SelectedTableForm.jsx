function SelectedTableForm(props) {
    const {setSelectedRowList, totalHak, setTotalHak} = props;
    const onClickClearButton = (event) => {
        setSelectedRowList([]);
        setTotalHak(0);
    }
    return (
        <div>
            <button onClick={onClickClearButton}>비우기🗑</button>
            &nbsp;학점 : {totalHak}
        </div>
    )
}

export default SelectedTableForm;
