
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});


export default function Page() {

    return (
    <>
    <h1>Hello, Next.js!</h1>
      <MapComponent></MapComponent>
    </>
)
    
  }