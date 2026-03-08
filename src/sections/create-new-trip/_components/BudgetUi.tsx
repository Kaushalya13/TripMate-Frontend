"use client";

export const SelctBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs and save money',
    icon: '💸',
    color: 'bg-green-50 text-green-800'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Balanced comfort and affordability',
    icon: '💰',
    color: 'bg-yellow-50 text-yellow-800'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Premium experience with top-tier comfort',
    icon: '👑',
    color: 'bg-purple-50 text-purple-800'
  }
];

function BudgetUi({ onSelect }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 font-sans">
      {SelctBudgetOptions.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(`${item.title}: ${item.desc}`)}
          className={`p-4 border border-black rounded-2xl cursor-pointer text-center transition-transform hover:scale-105 hover:shadow-lg ${item.color}`}
        >
          <div className="text-sm mb-2">{item.icon}</div>
          <h2 className="font-semibold text-sm">{item.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default BudgetUi;