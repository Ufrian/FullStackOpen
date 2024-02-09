const Notification = ({ notification }) => {
  
  if (!notification.msg) {
    return null
  }
  
  return (
    <div className={`alert ${notification.type}`}>
      <span>{notification.msg}</span>
    </div>
  )
}

export default Notification