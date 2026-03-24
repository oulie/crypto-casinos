import * as React from "react";
import { useRouter } from "next/router";
import { PlasmicModalSearch } from "./plasmic/cryptocasinos/PlasmicModalSearch";

function ModalSearch_(props, ref) {
  const router = useRouter();
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

  React.useEffect(() => {
    const root = localRef.current;
    if (!root) {
      return undefined;
    }

    const input = root.querySelector("input, textarea, [role='textbox']");
    if (!input) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();

      const searchTerm = event.currentTarget.value?.trim();

      router.push({
        pathname: "/search",
        query: searchTerm ? { s: searchTerm } : {},
      });
    };

    input.addEventListener("keydown", handleKeyDown);

    return () => {
      input.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

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
