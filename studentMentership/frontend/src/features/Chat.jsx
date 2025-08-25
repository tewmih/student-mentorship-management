import ChatComponent from "../ui/chart/Chat";
import { FaArrowAltCircleRight } from "react-icons/fa";
import ChatButton from "../ui/Buttonn";
const sampleMessages = [
  {
    id: 1,
    text: "That sounds like a great plan! Excited 😃",
    timestamp: new Date("2024-01-15T10:30:00"),
    sender: {
      id: "grace",
      name: "Grace Miller",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 2,
    text: "Hey Grace, how's it going?",
    timestamp: new Date("2024-01-15T10:30:00"),
    sender: {
      id: "jack",
      name: "Jack Raymonds",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
];

const sampleChatList = [
  {
    id: "liam1",
    name: "Liam",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Hey, how's the project going?",
    lastMessageTime: "04:50 PM",
    isTyping: false,
    messages: [
      {
        id: 1,
        text: "Hey there! How are you doing?",
        timestamp: new Date("2024-01-15T16:45:00"),
        sender: {
          id: "liam1",
          name: "Liam",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: 2,
        text: "I'm doing great, thanks for asking!",
        timestamp: new Date("2024-01-15T16:46:00"),
        sender: {
          id: "jack",
          name: "Jack Raymonds",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: 3,
        text: "Hey, how's the project going?",
        timestamp: new Date("2024-01-15T16:50:00"),
        sender: {
          id: "liam1",
          name: "Liam",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
    ],
  },
  {
    id: "liam2",
    name: "Sarah",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Let's schedule a meeting tomorrow",
    lastMessageTime: "03:30 PM",
    isTyping: false,
    messages: [
      {
        id: 1,
        text: "Hi Jack! Hope you're having a good day",
        timestamp: new Date("2024-01-15T15:20:00"),
        sender: {
          id: "sarah",
          name: "Sarah",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: 2,
        text: "Hey Sarah! Yes, it's been productive so far",
        timestamp: new Date("2024-01-15T15:22:00"),
        sender: {
          id: "jack",
          name: "Jack Raymonds",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: 3,
        text: "Let's schedule a meeting tomorrow",
        timestamp: new Date("2024-01-15T15:30:00"),
        sender: {
          id: "sarah",
          name: "Sarah",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
    ],
  },
  {
    id: "mike",
    name: "Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the update!",
    lastMessageTime: "02:15 PM",
    isTyping: false,
    messages: [
      {
        id: 1,
        text: "Can you send me the latest report?",
        timestamp: new Date("2024-01-15T14:10:00"),
        sender: {
          id: "mike",
          name: "Mike Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: 2,
        text: "I'll send it right away",
        timestamp: new Date("2024-01-15T14:12:00"),
        sender: {
          id: "jack",
          name: "Jack Raymonds",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
      {
        id: 3,
        text: "Thanks for the update!",
        timestamp: new Date("2024-01-15T14:15:00"),
        sender: {
          id: "mike",
          name: "Mike Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
      },
    ],
  },
];

const currentUser = { id: "jack", name: "Jack Raymonds" };

function Chat() {
  return (
    <div className=" w-[100%] bg-gray-50">
      <div className="flex flex-col sm:flex-row rounded-lg overflow-y-scroll h-screen px-5 w-full">
        <div className="w-full">
          <ChatComponent
            showSidebar={true}
            chatType="group"
            messages={sampleMessages}
            chatList={sampleChatList}
            pinnedChats={sampleChatList.slice(0, 2)}
            currentUser={currentUser}
            onSendMessage={(message) => console.log("Send message:", message)}
            onTyping={(isTyping) => console.log("Typing:", isTyping)}
          />
        </div>
        <div className="flex ml-5 flex-col shadow-sm rounded-lg space-y-40 justify-center items-center">
          <ChatButton
            title="Add session"
            icon={<FaArrowAltCircleRight />}
            onClick={() => alert("Add session button clicked!")}
          />
          <ChatButton
            title="Add task"
            icon={<FaArrowAltCircleRight />}
            onClick={() => alert("Add task button clicked!")}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
