import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Text, Box } from "@mantine/core";
import "./ApplicantNotifications.css";

// Dummy data for notifications
const notificationsData = [
  {
    id: 1,
    title: "Patent Application - Smart Home Security",
    status: "Rejected",
    description: "Application rejected by PCC Admin due to missing details.",
    date: "2024-10-23",
    time: "14:30:00",
  },
  {
    id: 2,
    title: "Patent Application - AI Driven Agriculture",
    status: "Accepted",
    description:
      "Application accepted by PCC Admin and forwarded to Director for initial review.",
    date: "2024-10-22",
    time: "10:15:30",
  },
  {
    id: 3,
    title: "Patent Application - Quantum Computing",
    status: "Accepted",
    description:
      "Application approved by Director and sent to Attorney for Patentability check.",
    date: "2024-10-21",
    time: "09:45:00",
  },
  {
    id: 4,
    title: "Patent Application - Renewable Energy Storage",
    status: "Rejected",
    description: "Application rejected by Director during final approval step.",
    date: "2024-10-20",
    time: "16:20:45",
  },
];

// Notification card component
function NotificationCard({
  id,
  title,
  status,
  description,
  date,
  time,
  color,
  onMarkAsRead,
}) {
  return (
    <Card
      className="notification-card"
      style={{
        borderLeft: `6px solid ${color}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "250px",
        height: "100%",
      }}
    >
      <div>
        <Text className="notification-title">{title}</Text>
        <Text className="notification-status" style={{ color }}>
          {status}
        </Text>
        <Text className="notification-date">{`${date} | ${time}`}</Text>
        <Text
          className="notification-description"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Text>
      </div>

      <Button
        variant="outline"
        className="markReadButton"
        onClick={() => onMarkAsRead(id)}
        style={{ marginTop: "auto" }}
      >
        Mark as Read
      </Button>
    </Card>
  );
}

// PropTypes validation for NotificationCard
NotificationCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
};

// Main NotificationsPage component
function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <Box style={{ width: "95%" }}>
      {/* Page Title */}
      <Text className="notif-title">Notifications</Text>

      {/* Notifications container */}
      <Box className="notifications-container">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            id={notification.id}
            title={notification.title}
            status={notification.status}
            description={notification.description}
            date={notification.date}
            time={notification.time}
            color={notification.color}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </Box>
    </Box>
  );
}

export default NotificationsPage;
