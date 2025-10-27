import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import FeedbackTable from "../components/FeedbackTable";
import FeedbackPieChart from "../charts/PieChart";

interface Feedback {
  id: string;
  date: string;
  employeeName: string;
  score: number;
  notes: string;
}

const Dashboard = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    const feedbackRef = collection(db, "feedback");

    const unsubscribe = onSnapshot(feedbackRef, (snapshot) => {
      const feedbackData: Feedback[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          employeeName: data.employeeName,
          score: data.score,
          notes: data.notes,
          date:
            data.date instanceof Timestamp
              ? data.date.toDate().toLocaleDateString()
              : data.date,
        };
      });
      setFeedback(feedbackData);
    });

    return () => unsubscribe();
  }, []);

  const averageScore =
    feedback.length > 0
      ? feedback.reduce((sum, f) => sum + f.score, 0) / feedback.length
      : 0;

  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-6 w-full overflow-y-auto">
      <FeedbackTable feedback={feedback} />
      <FeedbackPieChart feedback={feedback} averageScore={averageScore} />
    </div>
  );
};

export default Dashboard;
