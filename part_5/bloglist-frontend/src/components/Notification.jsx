const Notification = ({ notification }) => {
  
  if (!notification.msg) {
    return null
  }

  console.log("Notification is", notification)
  
  return (
    <div className={`alert ${notification.type}`}>
      <span>{notification.msg}</span>
    </div>
  )
}

export default Notification