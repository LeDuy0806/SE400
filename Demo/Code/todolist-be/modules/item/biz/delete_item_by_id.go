package biz

import (
	"context"
	"errors"
	"todo-list/common"
	"todo-list/modules/item/model"
)

type DeleteItemStorage interface {
	FindItem(ctx context.Context, condition map[string]interface{}) (*model.TodoItem, error)
	DeleteItem(ctx context.Context, condition map[string]interface{}) error
}

type deleteItemBiz struct {
	store DeleteItemStorage
}

func NewDeleteItemBiz(store DeleteItemStorage) *deleteItemBiz {
	return &deleteItemBiz{store: store}
}

func (biz *deleteItemBiz) DeleteItem(ctx context.Context, id int) error {
	foundItem, err := biz.store.FindItem(ctx, map[string]interface{}{"id": id})

	if err != nil {
		if errors.Is(err, common.RecordNotFound) {
			return common.ErrCannotGetEntity(model.EntityName, err)
		}
		return common.ErrCannotDeleteEntity(model.EntityName, err)
	}

	if foundItem.Status == model.ItemStatusDeleted {
		return common.ErrEntityDeleted(model.EntityName, model.ErrItemIsDeleted)
	}

	if err := biz.store.DeleteItem(ctx, map[string]interface{}{"id": id}); err != nil {
		return common.ErrCannotDeleteEntity(model.EntityName, err)
	}

	return nil
}
