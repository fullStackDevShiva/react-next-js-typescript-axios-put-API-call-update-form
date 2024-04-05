"use client";

interface ItemProps {
  itemId?: string;
  index?: number;
  item_title?: string;
  item_subtitle?: string;
  editFormDisplayHandle: () => void;
}

const Course = (props: ItemProps) => {
  const { itemId, index, item_title, item_subtitle, editFormDisplayHandle } =
    props;

  return (
    <div className="card mb-2 w-full" key={index}>
      <h4>{item_title}</h4>
      <p className="info mb-2">{item_subtitle}</p>
      <div className="edit-btn">
        <button
          className="btn bg-transparent text-pink-600 text-xs p-0"
          onClick={() => editFormDisplayHandle(itemId)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Course;
