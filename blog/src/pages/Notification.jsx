import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/NotificationCard';
import { getNotification, markReadNotification } from '../services/notificationService';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../redux/notificationSlice';

const Notification = () => {
    const dispatch = useDispatch();
    const { userId } = useSelector((state) => state.user);
    const [notifications, setNotifications] = useState([]);
    const { notificationData, notificationCount } = useSelector((state) => state.notification);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getNotification(userId) || []; // Fetch notifications
                setNotifications(notificationData);
                dispatch(setNotification({
                    notificationCount: 0,
                    notificationData: response.data
                }));


                if (response.data.length > 0) {
                    // await markReadNotification(userId); // Mark notifications as read
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);
    return (
        <div className="flex flex-col items-center space-y-4  max-w-[500px] ">
            {Array.isArray(notifications) && notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <NotificationCard
                        key={index}
                        postId={notification.postId}
                        userImage={notification.userImage}
                        username={notification.username}
                        postImage={notification.postImage}
                        type={notification.actionType}
                        commentText={notification.commentText}
                    />
                ))
            ) : (
                <p className="text-gray-500 text-center">No notifications available</p>
            )}
        </div>

    );
};

export default Notification;
