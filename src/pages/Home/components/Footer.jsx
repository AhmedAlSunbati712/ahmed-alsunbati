import {
  Linkedin,
  Github,
  Mail,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/ahmed-al-sunbati", label: "LinkedIn" },
    { icon: <Github size={18} />, href: "https://github.com/AhmedAlSunbati712", label: "GitHub" },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: "ahmed.m.al.sunbati.27@dartmouth.edu", href: "mailto:ahmed.m.al.sunbati.27@dartmouth.edu" },
    { icon: <Phone size={16} />, text: "+1 6032668597", href: "tel:+16032668597" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer id="contact" className="border-t border-border px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="rounded-xl border border-border bg-surface p-8 shadow-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">Ahmed Al Sunbati</h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                Building thoughtful software systems with a focus on clarity, reliability, and long-term value.
              </p>

              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    whileHover={{ y: -1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 1 }}
                    transition={{ duration: 0.15 }}
                  >
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-foreground">Contact</h4>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-3 text-sm"
                  >
                    <span className="mt-0.5 text-muted-foreground">{info.icon}</span>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{info.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>

          <motion.div
            className="mt-10 flex flex-col items-start justify-between space-y-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            viewport={{ once: true }}
          >
            <p>© {currentYear} Ahmed Al Sunbati.</p>
            <a href="#hero" className="text-muted-foreground transition-colors hover:text-foreground">
              Back to top
            </a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
