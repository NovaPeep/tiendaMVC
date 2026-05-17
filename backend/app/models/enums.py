from sqlalchemy import Enum

product_category_enum = Enum(
    'ron', 'cerveza', 'vino', 'vodka', 'whisky', 'otro',
    name='product_category_enum'
)

presentation_enum = Enum(
    'botella', 'lata', 'sixpack', 'caja',
    name='presentation_enum'
)

unit_type_enum = Enum(
    'unit', 'sixpack', 'box',
    name='unit_type_enum'
)

payment_method_enum = Enum(
    'cash', 'transfer',
    name='payment_method_enum'
)