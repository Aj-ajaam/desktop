import * as React from 'react'
import { renderImage } from './render-image'
import { IImageSize } from './modified-image-diff'
import { Image } from '../../../models/diff'

interface ITwoUpProps {
  readonly maxSize: IImageSize

  readonly previous: Image
  readonly current: Image

  readonly previousImageSize: IImageSize | null
  readonly currentImageSize: IImageSize | null

  readonly onPreviousImageLoad: (img: HTMLImageElement) => void
  readonly onCurrentImageLoad: (img: HTMLImageElement) => void
}

export class TwoUp extends React.Component<ITwoUpProps, {}> {
  public render() {
    const style = {
      maxHeight: this.props.maxSize.height,
      maxWidth: this.props.maxSize.width,
    }
    return (
      <div className="image-diff_inner--two-up">
        <div className="image-diff__before">
          <div className="image-diff__header">Deleted</div>
          {renderImage(this.props.previous, {
            onLoad: this.onPreviousImageLoad,
            style,
          })}
          <div className="image-diff__footer">
            <span className="strong">W:</span>{' '}
            {this.props.previousImageSize!.width}px |{' '}
            <span className="strong">H:</span>{' '}
            {this.props.previousImageSize!.height}px
          </div>
        </div>
        <div className="image-diff__after">
          <div className="image-diff__header">Added</div>
          {renderImage(this.props.current, {
            onLoad: this.onCurrentImageLoad,
            style,
          })}
          <div className="image-diff__footer">
            <span className="strong">W:</span>{' '}
            {this.props.currentImageSize!.width}px |{' '}
            <span className="strong">H:</span>{' '}
            {this.props.currentImageSize!.height}px
          </div>
        </div>
      </div>
    )
  }

  private onPreviousImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    this.props.onPreviousImageLoad(e.currentTarget)
  }

  private onCurrentImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    this.props.onCurrentImageLoad(e.currentTarget)
  }
}