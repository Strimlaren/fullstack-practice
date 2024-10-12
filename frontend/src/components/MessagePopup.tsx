import { messagePopupProps } from "../types/types";

export default function MessagePopup({ message }: messagePopupProps) {
  return (
    <div className="absolute flex flex-col items-center bg-black bg-opacity-80 w-screen h-screen z-10">
      <div className="flex flex-col w-96 mt-72 bg-black p-1 rounded-md items-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white flex border p-3 border-gray-400 flex-col w-full rounded-md shadow-md">
          <p className="text-1xl text-slate-900 text-center">{message}</p>
        </div>
      </div>
    </div>
  );
}
