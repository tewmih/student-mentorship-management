

const Stats = () =>{

    return(
    <section className="bg-background py-12">
      <div className="container flex flex-wrap justify-center gap-12 text-center">
        
        <div className="card-hover gradient-border p-6 rounded-lg shadow-sm min-w-[150px]">
          <p className="text-3xl font-bold text-foreground">500+</p>
          <p className="text-muted-foreground text-sm">Active Mentors</p>
        </div>

        <div className="card-hover gradient-border p-6 rounded-lg shadow-sm min-w-[150px]">
          <p className="text-3xl font-bold text-foreground">2,000+</p>
          <p className="text-muted-foreground text-sm">Students Helped</p>
        </div>

        <div className="card-hover gradient-border p-6 rounded-lg shadow-sm min-w-[150px]">
          <p className="text-3xl font-bold text-foreground">95%</p>
          <p className="text-muted-foreground text-sm">Success Rate</p>
        </div>

      </div>
    </section>  
    )
}


export default Stats
