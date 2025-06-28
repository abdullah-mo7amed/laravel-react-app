<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\User;

class OrderThankYouMail extends Mailable implements ShouldQueue
{
  use Queueable, SerializesModels;

  public $user;

  public function __construct(User $user)
  {
    $this->user = $user;
  }

  public function build()
  {
    return $this->subject('Thank you for your order!')
      ->view('emails.order_thank_you')
      ->with(['user' => $this->user]);
  }
}
