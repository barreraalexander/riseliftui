// TODO CONVERT TO FUNCTION COMPONENT

export default function ViewWorkoutCard(props: any){
    return (
        <form>
            <div className="card bg-dark p-2 d-flex flex-column">
                <p className="text-white">
                    id: {props.workout_session.xid}
                </p>
                <p className="text-white">
                    name: {props.workout_session.name}
                </p>
            </div>
        </form>
    )

}