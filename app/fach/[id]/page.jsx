import Thema from "@/components/Thema"

function page({ params }) {

  return (
    <div>
        <Thema params={params}/>
    </div>
  )
}

export default page