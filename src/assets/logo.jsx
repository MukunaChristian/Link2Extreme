import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={22}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M1 6.748h10.92M5.598 15.944h2.3M10.771 15.944h4.598"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23.991 10.806v4.69c0 4.035-1.023 5.046-5.104 5.046H6.104C2.024 20.543 1 19.532 1 15.497v-9.45C1 2.013 2.023 1 6.104 1h9.265"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M20.635 1.724 16.37 5.99c-.161.161-.322.483-.357.713l-.23 1.632c-.08.587.334 1 .92.92l1.633-.23c.23-.034.551-.195.712-.356l4.265-4.265c.736-.736 1.08-1.587 0-2.667-1.092-1.092-1.943-.747-2.678-.012Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M20.025 2.333A3.848 3.848 0 0 0 22.692 5"
    />
  </svg>
)
export default SvgComponent
