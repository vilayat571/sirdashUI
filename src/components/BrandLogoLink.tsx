import { Link } from "react-router-dom";
import logo from "../assets/sirdash-logo.png";

type BrandLogoLinkProps = Readonly<{
  to?: string;
  className?: string;
  labelClassName?: string;
}>;

export default function BrandLogoLink({
  to = "/",
  className = "flex items-center gap-2.5 group",
  labelClassName = "font-bold text-lg tracking-tight text-gray-900",
}: BrandLogoLinkProps) {
  return (
    <Link to={to} className={className}>
      <div className="flex h-8 w-8 items-center justify-center">
        <img src={logo} alt="" />
      </div>
      <span className={labelClassName}>sirdash.ai</span>
    </Link>
  );
}
