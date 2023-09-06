import React from "react"

const data=[
	{
		id:"1",
		name:"theatre1",
		location:"hdfdjf",
	},
	{
		id:"2",
		name:"theatre2",
		location:"hdfdjf",
	},
]
const AddTheatre=()=>{
    return(
        <div>
			<button
				className="border-4 bg-blue-800 text-white px-4 py-2 mt-8 "
			>
				ADD Theatres
					</button>
			<div className="w-full h-min border-2 p-2">
				<div className="font-bold text-lg">
					Requests
				</div>
				<div>
					{data.map((item)=>{
						return(
							<div key={item.id} className="flex justify-evenly">
								<div>
									{item.name}
								</div>
								<div>
									{item.location}
								</div>
								<button className="border-2">
									Approve
								</button>
							</div>
						)
					})}

					
				</div>
			</div>
			<div className="w-full h-min border-2 p-2">
				<div className="font-bold text-lg">
					Listed Theatres
				</div>
				<div>

				</div>
			</div>
        </div>
    )
}
export default AddTheatre;