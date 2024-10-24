package biz

import (
	"context"
	"strings"
	"todo-list/common"
	"todo-list/modules/item/model"
)

type InsertItemStorage interface {
	InsertItem(ctx context.Context, data *model.TodoItemCreation) error
}

type createItemBiz struct {
	store InsertItemStorage
}

func NewCreateItemBiz(store InsertItemStorage) *createItemBiz {
	return &createItemBiz{store: store}
}

func (biz *createItemBiz) CreateItem(ctx context.Context, data *model.TodoItemCreation) error {
	title := strings.TrimSpace(data.Title)

	if title == "" {
		return model.ErrTitleEmpty
	}

	if err := biz.store.InsertItem(ctx, data); err != nil {
		return common.ErrCannotCreateEntity(model.EntityName, err)
	}

	return nil
}
