import PropTypes from 'prop-types'

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

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

export default Notification