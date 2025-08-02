import PropTypes from 'prop-types';
import clsx from 'clsx';

function Toast({ message, type }) {
  return (
    <div
      className={clsx(
        'fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded px-6 py-3 text-stone-200 shadow-lg',
        {
          'bg-teal-600': type === 'success',
          'bg-rose-700': type === 'error',
          'bg-amber-600': type === 'warning',
          'bg-slate-600': type === 'info',
        }
      )}
    >
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Toast;
