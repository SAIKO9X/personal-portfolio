// "use client";

// import { usePreloader } from "@/contexts/PreloaderContext";

// export default function PreloaderResetButton() {
//   const { resetPreloader } = usePreloader();

//   if (process.env.NODE_ENV !== "development") {
//     return null;
//   }

//   return (
//     <button
//       onClick={resetPreloader}
//       style={{
//         position: "fixed",
//         bottom: "20px",
//         right: "20px",
//         zIndex: 99999,
//         padding: "10px 15px",
//         backgroundColor: "#ff4444",
//         color: "white",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//         fontSize: "12px",
//         fontWeight: "bold",
//       }}
//     >
//       Reset Preloader
//     </button>
//   );
// }
