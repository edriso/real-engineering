import type { MDXComponents } from 'mdx/types';
import {
  After,
  Before,
  Callout,
  Compare,
  Drill,
  Quote,
  SmartLink,
  Takeaways,
} from './mdx';

/** Everything a lesson can use without importing it. */
export const mdxComponents: MDXComponents = {
  a: SmartLink,
  table: (props) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
  Callout,
  Compare,
  Before,
  After,
  Drill,
  Takeaways,
  Quote,
};
