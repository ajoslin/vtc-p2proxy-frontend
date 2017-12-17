import { h } from 'preact'
import cx from 'classnames'

export default function StatTable({ items, className, ...rest }) {
  return (
    <div className={cx('dark-gray', className)} {...rest}>
      {items.map(item => (
        <div className="bb b--light-gray flex overflow-hidden">
          <div className="w4 flex-shrink-0 b pa2">{item[0]}</div>
          <div className="pa2 bl b--light-gray flex-auto truncate"
               dangerouslySetInnerHTML={{__html: item[1]}}>
          </div>
        </div>
      ))}
    </div>
  )
}
