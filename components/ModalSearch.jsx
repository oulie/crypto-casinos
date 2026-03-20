import * as React from "react";
import { PlasmicModalSearch } from "./plasmic/cryptocasinos/PlasmicModalSearch";

function ModalSearch_(props, ref) {
  const localRef = React.useRef(null);

  React.useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const root = localRef.current;
      if (!root) {
        return;
      }

      const target = root.querySelector("input, textarea, [role='textbox']");
      target?.focus?.();
    });

    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <PlasmicModalSearch
      {...props}
      root={{
        ...props.root,
        ref: (node) => {
          localRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }

          if (typeof props.root?.ref === "function") {
            props.root.ref(node);
          } else if (props.root?.ref) {
            props.root.ref.current = node;
          }
        },
      }}
      textField={{
        ...props.textField,
        autoFocus: true,
      }}
    />
  );
}

const ModalSearch = React.forwardRef(ModalSearch_);

export default ModalSearch;
