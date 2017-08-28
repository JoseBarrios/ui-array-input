# ui-array-input
Provides an interface for entering array inputs

#bugs
Separator doesn't work properly, when set to separator="/n" it takes it as a literal and not as the hidden char (new line)
When you tab out of an input, the blur event doesn't get triggered (and thus the empty array items is not cleared)
