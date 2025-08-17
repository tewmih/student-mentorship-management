

const Footer = ()=>{

    return(
        <footer className="bg-card border-t border-border py-8 mt-auto">
      <div className="container flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-sm">
        
        {/* Information */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-foreground">Information</span>
          <a href="#" className="hover:text-primary transition-colors">FAQ</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-foreground">Company</span>
          <a href="#" className="hover:text-primary transition-colors">About us</a>
          <a href="#" className="hover:text-primary transition-colors">Contact us</a>
        </div>

        {/* Copyright */}
        <div className="text-muted-foreground text-center md:text-right">
          © {new Date().getFullYear()} Student Mentorship
        </div>
      </div>
    </footer>   
    )
}

export default Footer;

