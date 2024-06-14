import "./Notification.css"

const Notification = ({ notifObj }) => {
    if (!notifObj) return

    return (
        <div className={`msg ${notifObj.status}`}>
            {notifObj.msg}
        </div>
    )
}

export default Notification