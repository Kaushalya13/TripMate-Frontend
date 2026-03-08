"use client";

export const SelectTravelesList = [
  { id: 1, title: "JustMe", icon: "🧳", people: "1" },
  { id: 2, title: "Couple", icon: "💑", people: "2 people" },
  { id: 3, title: "Family", icon: "👨‍👩‍👧‍👦", people: "3-5 people" },
  { id: 4, title: "Friends", icon: "🧑‍🤝‍🧑", people: "5-10 people" }
];

type Props = {
  onSelect: (value: string) => void;
};

function GroupSizeUi({ onSelect }: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center mt-1">
      {SelectTravelesList.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.title+":"+item.people)}
          className="p-2 border rounded-xl bg-white hover:border-green-400 cursor-pointer text-center text-sm transition"
        >
          <div className="text-md">{item.icon}</div>
          <h2 className="font-medium mt-1">{item.title}</h2>

        </div>  
      ))}
    </div>
  );
}

export default GroupSizeUi;