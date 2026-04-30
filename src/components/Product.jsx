import clsx from 'clsx';

export const Product = ({ product }) => {
  const { user, category } = product;

  return (
    <tr data-cy="Product">
      <td className="has-text-weight-bold" data-cy="ProductId">
        1
      </td>

      <td data-cy="ProductName">{product.name}</td>
      <td data-cy="ProductCategory">
        {category ? `${category.icon} - ${category.title}` : null}
      </td>

      <td
        data-cy="ProductUser"
        className={clsx({
          'has-text-link': user?.sex === 'm',
          'has-text-danger': user?.sex === 'f',
        })}
      >
        {product.user.name}
      </td>
    </tr>
  );
};
