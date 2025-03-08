const Message = ({ notification }) => {

  return (
    <div className="flex items-start p-4 border border-gray-200 rounded-lg shadow-md bg-white">
      {/* Optional image */}
      {notification.image && (
        <div className="mr-4">
          <img
            src={notification.image}
            alt="Notification"
            className="w-16 h-16 rounded-md object-cover"
          />
        </div>
      )}

      {/* Notification Content */}
      <div className="flex-1">
        <span className="text-lg font-semibold text-gray-900">{notification.title}</span>
        <p className="text-gray-600 mt-1">{notification.body}</p>
      </div>
    </div>
  );
};

export default Message;